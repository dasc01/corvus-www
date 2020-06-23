#!/bin/bash
user=`/usr/bin/whoami`;
cscratch="/global/cscratch1/sd/$user";
cd ;
userhome=`pwd`;
cd -;
corwork=$cscratch/Corvus-Work;

cd $corwork ;

filename=`grep filename session-variables | tail -1 | awk '{print $2}'`;
jobname=`grep jobname session-variables | tail -1 | awk '{print $2}'`;
calctype=`grep calctype session-variables | tail -1 | sed -e "s/.*=//"`;

if [[ ! -z $filename ]]  && [[ ! -z $jobname ]] ; then
mv $filename $jobname ;
cd $jobname ;
/project/projectdirs/m2757/www/shell/xyztonw.sh $filename $calctype ;
cp /project/projectdirs/m2757/www/shell/bashCorvus.sl . ;
/project/projectdirs/m2757/www/shell/setupSlurmScript.sh  $filename $calctype ;
cp $corwork/session-variables . ;
sbatch bashCorvus.sl ;
pwd ;
else
echo "Something wrong!";
echo $filename
echo $jobname
echo $calctype
fi


