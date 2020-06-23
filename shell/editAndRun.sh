#!/bin/bash
user=`/usr/bin/whoami`;
cscratch="/global/cscratch1/sd/$user";
cd ;
userhome=`pwd`;
cd -;
corwork=$cscratch/Corvus-Work;

cd $corwork ;

jobname=`grep jobname session-variables | tail -1 | awk '{print $2}'`;
calctype=`grep calctype session-variables | tail -1 | sed -e "s/.*=//"`;

if [[ -d $jobname ]] ; then
cd $jobname ;
if [[ $jobname = *"xyz"* ]]; then
    filname=`echo $jobname | sed -e "s/\.xyz.*/.xyz/"`;
elif [[ $jobname = *"XYZ"* ]]; then
    filname=`echo $jobname | sed -e "s/\.XYZ.*/.XYZ/"`;
elif [[ $jobname = *"cif"* ]]; then
    filname=`echo $jobname | sed -e "s/\.cif.*/.cif/"`;
elif [[ $jobname = *"CIF"* ]]; then
    filname=`echo $jobname | sed -e "s/\.CIF.*/.CIF/"`;
fi
/project/projectdirs/m2757/www/shell/xyztonw.sh $filname $calctype ;
cp /project/projectdirs/m2757/www/shell/bashCorvus.sl . ;
/project/projectdirs/m2757/www/shell/setupSlurmScript.sh  $filname $calctype ;
cp $corwork/session-variables . ;
sbatch bashCorvus.sl ;
pwd ;
else
echo "Something wrong!";
echo $filname
echo $jobname
echo $calctype
fi


