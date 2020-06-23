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
calc="opt";
elif [ "$calctype" == "SPECTRA" ] ; then
calc="xas";
fi

npn=64;
nlin=`wc $filename | awk '{print $1}'`;
nproc=`echo "($nlin-2)" | bc`;
nnodes=`echo "($nproc/$npn)+1" | bc`;
perl -pi -e "s/job-name=.*/job-name=$filename/" bashCorvus.sl ; 
perl -pi -e "s/nodes=.*/nodes=$nnodes/" bashCorvus.sl ; 
perl -pi -e "s/NP=.*/NP=$nproc/" bashCorvus.sl ; 
perl -pi -e "s/Input=.*/Input=$calctype.inp/" bashCorvus.sl ; 
