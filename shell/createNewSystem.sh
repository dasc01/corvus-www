#!/bin/bash
user=`/usr/bin/whoami`;

echo "User is:" $user;

cscratch="/global/cscratch1/sd/$user";
cd ;
userhome=`pwd`;
cd -;
echo "User's home is:" $userhome;

corwork=$cscratch/Corvus-Work;
echo "File uploaded is:" $1 ; 
jobname=`echo $1`;
dat=`date +%s` ;
jobname=`echo $jobname-$dat`;
echo "Job name will be:" $jobname;

filename=$1;

if [ -d $cscratch/Corvus-Work/$jobname ] ; then
echo "Job directory exists"
else
mkdir $cscratch/Corvus-Work/$jobname ;
fi

#if [ -e $userhome/$filename ] ; then
#echo "Moving file to Work area";
#mv $userhome/$filename $corwork ;
#else
#echo "File $filename not found";
#fi

echo "filename: " $filename > $cscratch/Corvus-Work/session-variables;
echo "jobname: " $jobname >> $cscratch/Corvus-Work/session-variables;
