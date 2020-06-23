#!/bin/bash
#SBATCH --job-name=nwtest 
#SBATCH --partition=debug  
#SBATCH --time=00:10:00
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=64
#SBATCH -L SCRATCH
#SBATCH -C haswell
##SBATCH -A m772
#SBATCH --output=%j.sout
#SBATCH --export=ALL

#source ~/.bashrc ;
#module load abinit ; 
#module load nwchem ; 

# Set the path to the Corvus installation
export CORVUS_TOP=/project/projectdirs/m2757/Corvus-cori

# Set up the exe search path to the Corvus script
if [ -z $PATH ] ;  then
  export PATH=$CORVUS_TOP/bin ;
else
  export PATH=$CORVUS_TOP/bin:${PATH} ;
fi

#Set paths to executables
export PATH=${PATH}:/project/projectdirs/m2757/NW-HOME/nwchem-7.0.0/bin/LINUX64
export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/opt/intel/compilers_and_libraries_2019.3.199/linux/mkl/lib/intel64:/opt/intel/compilers_and_libraries_2019.3.199/linux/compiler/lib/intel64
export NWCHEM_BASIS_LIBRARY=/usr/common/software/nwchem/6.8.1/hsw/intel/19.0.3.199/data/libraries
# Set up the python path to Corvus
if [ -z $PYTHONPATH ] ; then
  export PYTHONPATH=$CORVUS_TOP/lib/python2.7/site-packages
else
  export PYTHONPATH=$CORVUS_TOP/lib/python2.7/site-packages:${PYTHONPATH}
fi

# If this is a parallel run, please set the total number of processes here
# NOTE: It should usually be the product of the values used for the --nodes and
#       --ntasks-per-node options at the top of this script.
export NP=4     
# Set the command for parallel runs
# NOTE: This should probably not be changed fir the Times cluster
export PARACOMM="srun -n $NP"
# Set the Corvus input file name here
export Input=H2.in
run-corvus -d 1 -c --parallelrun "$PARACOMM" -i $Input
