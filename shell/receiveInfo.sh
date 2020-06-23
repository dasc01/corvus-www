#!/bin/bash
user=`/usr/bin/whoami`;
cscratch="/global/cscratch1/sd/$user";
cd ;
userhome=`pwd`;
cd -;
corwork=$cscratch/Corvus-Work;
echo "info is:" "$*" ; 
echo "$*" >> $cscratch/Corvus-Work/session-variables;
