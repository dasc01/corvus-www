#!/bin/bash
user=`/usr/bin/whoami`;
cscratch="/global/cscratch1/sd/$user";
cd ;
userhome=`pwd`;
cd -;
corwork=$cscratch/Corvus-Work;

filename=$1;
calctype=$2;

if [ "$calctype" == "ENERGY" ] ; then
calc="ene_int";
elif [ "$calctype" == "OPTIMIZE" ] ; then
calc="aopt";
elif [ "$calctype" == "SPECTRA" ] ; then
calc="xas";
fi

echo "target_list { $calc }" > $calctype.inp ;
echo "usehandlers { Nwchem }" >> $calctype.inp ;
echo "cell_struc_xyz_red {" >> $calctype.inp ;
nlin=`wc $filename | awk '{print $1}'`;
nlin=`echo "($nlin-2)" | bc`;
tail -n $nlin $filename     >> $calctype.inp ;
echo "}" >> $calctype.inp ;
if [ "$calc" == "xas" ] ; then
echo "nwchem.xas.xrayenergywin { -1.0  1.0 }" >> $calctype.inp ; 
fi
