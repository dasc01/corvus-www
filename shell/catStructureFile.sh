#!/bin/bash
user=`/usr/bin/whoami`;
cscratch="/global/cscratch1/sd/$user";
corwork=$cscratch/Corvus-Work;
filename=`grep filename $cscratch/Corvus-Work/session-variables | awk '{print $2}'`;
cat $corwork/$filename ;
