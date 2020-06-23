#!/usr/bin/python
import sys
import json
import math
#print str(sys.argv),"\n"
#print len(sys.argv)
if len(sys.argv) < 7:
    print "usage:eigtodos.perl eigfile.dat emin emax ne sigma nkpoints \n"
    print "error: expecting 7 arguments! \n"
    exit()

file1 = open(str(sys.argv[1]),'r')
emin=float(sys.argv[2])
emax=float(sys.argv[3])
ne=int(sys.argv[4])
sigma=float(sys.argv[5])
nkp=int(sys.argv[6])

#print emin, emax, ne , sigma

eigs=[]
osci=[]
nb=0
for line in file1:
    data=line.split()
    if len(data)>1:
        eigs.append(float(data[0]))
        osci.append(float(data[1]))
#        print eigs[nb]
        nb+=1

egrid=[]
tdos=[]
de=(emax-emin)/ne
for ie in range(0,ne):
    ep=emin+ie*de
    egrid.append(ep)
    tdos.append(0.0)

nsd=5

for ib in range(0,nb):
    if eigs[ib] >= emin-nsd*sigma and eigs[ib] <= emax+nsd*sigma:
        el=max(0,int((eigs[ib]-nsd*sigma-emin)/de))
        er=min(ne,int((eigs[ib]+nsd*sigma-emin)/de))
        for ie in range(el,er):
            ep=egrid[ie]
            diff=((ep-eigs[ib])**2/sigma**2)*0.5
            gauss=math.exp(-diff)
            tdos[ie]=tdos[ie]+gauss*osci[ib]

pi=4.0*math.atan2(1,1)
norm=1.0/(sigma*math.sqrt(2*pi)*nkp)


fout=open("spect.dat",'w')
for ie in range(0,ne):
    val=str(egrid[ie])+"    "+str(tdos[ie]*norm)+"\n"
    fout.write(val)

#val="\n"
#fout.write(val)
file1.close()
#file1 = open(str(sys.argv[1]),'r')
#for line in file1:
#    data=line.split()
#    if len(data)>1:
#        fout.write(line)
fout.close()
#file1.close()

