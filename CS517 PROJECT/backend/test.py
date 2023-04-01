import os
import cv2
import numpy as np
from pathlib import Path
import shutil
inp='./features'
searcher='./dataset'
out='./hello'

i=0
for file_inp in os.listdir(inp):
    filename=Path(file_inp).stem
    for folder in os.listdir(searcher):
        for File in os.listdir(os.path.join(searcher, folder)):
            print(File)
            if filename==Path(File).stem:
                ext=File[File.rfind('.')+1:]
                print(ext)
                shutil.copy(os.path.join(searcher, folder, File), f'{out}/img{i}.{ext}')
                i+=1
                break
    