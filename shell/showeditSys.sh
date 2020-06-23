#!/bin/bash
user=`/usr/bin/whoami`;
cscratch="/global/cscratch1/sd/$user";
cd ;
userhome=`pwd`;
cd - > /dev/null 2>&1 ;
corwork=$cscratch/Corvus-Work;
cd $corwork ;

jobname=$1 ;

if [ -d $jobname ] ; then

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
if [ -f $filname ] ; then
    cat $filname ;
else
    echo "No structure file found";
fi
else
echo "No job directroy found." ;
fi

