#!/bin/bash
user=`/usr/bin/whoami`;
cscratch="/global/cscratch1/sd/$user";
cd ;
userhome=`pwd`;
cd - > /dev/null 2>&1 ;
corwork=$cscratch/Corvus-Work;
cd $corwork ;

jobname=$1 ;
calctype=`echo $2 | sed -e "s/calctype=//"`;

if [ -d $jobname ] ; then
cd $jobname ;
if [ "$calctype" == "ENERGY" ] ; then
calc="ene_int";
elif [ "$calctype" == "OPTIMIZE" ] ; then
calc="aopt";
elif [ "$calctype" == "SPECTRA" ] ; then
calc="xas";
fi
if [ -f Corvus.$calc.out ] ; then
 if [  "$calctype" == "ENERGY"  ] ; then
   cat Corvus.$calc.out ;
 elif  [ "$calctype" == "OPTIMIZE" ] ; then 
   nat=`wc Corvus.$calc.out | awk '{print $1}'`;
   echo $nat > Corvus.$calc.out.xyz ;
   echo "XYZ" >> Corvus.$calc.out.xyz ;
   cat Corvus.$calc.out >> Corvus.$calc.out.xyz ;
   cat Corvus.$calc.out.xyz ;
 elif  [ "$calctype" == "SPECTRA" ] ; then
  sed -e "s/[\(,\)]//" Corvus.xas.out  | sed -e "s/\[//" | sed -e "s/\]//" | sed -e "s/'//g" | sed -e "s/,//" > xas.tmp1;
  ndat=`wc xas.tmp1 | awk '{print $1}'`;
  ndat=`echo "($ndat/2)" | bc`;
  head -n $ndat xas.tmp1 > ene.tmp1 ;
  tail -n $ndat xas.tmp1 > osc.tmp1 ;
  paste ene.tmp1 osc.tmp1 > spec.tmp1 ;
  emin=`head -n 1 ene.tmp1`;
  emin=`echo "($emin-1)" | bc -l`;
  emax=`tail -n 1 ene.tmp1`;
  emax=`echo "($emax+1)" | bc -l`;
  sigma=`echo "($emax - $emin)/100" | bc -l`;
  /project/projectdirs/m2757/www/shell/eigtospect_1col.py spec.tmp1 $emin $emax 500 $sigma 1 ;
  cat spect.dat | awk '{print $1}' > ene.raw ;
  cat spect.dat | awk '{print $2}' > osc.raw ;
  perl -pi -e "s/\n/|/" ene.raw ;
#  echo  "\""`cat ene.raw`"\""   ;
  echo  `cat ene.raw`   ;
  perl -pi -e "s/\n/|/" osc.raw ;
  echo  `cat osc.raw`   ;
#  echo  "\""`cat osc.raw`"\""   ;
  rm *.tmp1 ;
 fi
else
echo "No output for $calctype found."; 
fi
else
echo "No job directroy found." ;
fi

