#!/bin/bash
user=`/usr/bin/whoami`;
echo "User is:" $user;
cscratch="/global/cscratch1/sd/$user";
echo "Scratch location is:" $cscratch;
if [ -d $cscratch/Corvus-Work ] ; then
echo $cscratch/Corvus-Work ;
echo "directory exists";
else
mkdir $cscratch/Corvus-Work ;
fi
echo "Contents of $cscratch/Corvus-Work";
ls $cscratch/Corvus-Work;
