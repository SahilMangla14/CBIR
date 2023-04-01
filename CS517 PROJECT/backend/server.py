from flask import Flask, jsonify, request, Response
# import resnet
import shutil
import os
from vgg import run_vgg
from color import run_color
from resnet import run_resnet
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/query', methods = ['POST'])
def func():
   response = jsonify({"msg": "This has CORS enabled 🎈"})
   # response.headers.add('Access-Control-Allow-Origin', '*')
   print(request.files['files'])
   img=request.files['files']
   img.save('./static/queries/q.jpg')
   return response
   

@app.route('/vgg', methods=['POST'])
def run_Vgg():
   response = jsonify({"msg": "This has CORS enabled 🎈"})
   # response.headers.add('Access-Control-Allow-Origin', '*')
   folder_path='./static'
   for filename in os.listdir(folder_path):
      file_path = os.path.join(folder_path, filename)
      try:
         if os.path.isfile(file_path):
            os.unlink(file_path)
         elif os.path.isdir(file_path): 
            os.rmdir(file_path)
      except Exception as e:
         print(f'Failed to delete {file_path}. Reason: {e}')
   run_vgg()
   return response
    
@app.route('/color', methods=['POST'])
def run_Color():
   response = jsonify({"msg": "This has CORS enabled 🎈"})
   # response.headers.add('Access-Control-Allow-Origin', '*')
   folder_path='./static'
   for filename in os.listdir(folder_path):
      file_path = os.path.join(folder_path, filename)
      try:
         if os.path.isfile(file_path):
            os.unlink(file_path)
         elif os.path.isdir(file_path): 
            os.rmdir(file_path)
      except Exception as e:
         print(f'Failed to delete {file_path}. Reason: {e}')
   run_color()
   return response

@app.route('/resnet', methods=['POST'])
def run_Resnet():
   response = jsonify({"msg": "This has CORS enabled 🎈"})
   # response.headers.add('Access-Control-Allow-Origin', '*')
   folder_path='./static'
   for filename in os.listdir(folder_path):
      file_path = os.path.join(folder_path, filename)
      try:
         if os.path.isfile(file_path):
            os.unlink(file_path)
         elif os.path.isdir(file_path): 
            os.rmdir(file_path)
      except Exception as e:
         print(f'Failed to delete {file_path}. Reason: {e}')
   run_resnet()
   return response

@app.route('/images', methods = ['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_images():
   # Get a list of image file names in the 'images' directory
   response = jsonify({"msg": "This has CORS enabled 🎈"})
   # response.headers.add('Access-Control-Allow-Origin', '*')
   # images_dir = './res'
   images_dir = './static'
   images = [f for f in os.listdir(images_dir) if f.endswith('.jpg') or f.endswith('.jpeg')]
   print(images)
   return jsonify(images)



@app.route('/getQueryImg',methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_query_img():
   response = jsonify({"msg": "This has CORS enabled 🎈"})
   images_dir = './static/queries'
   images = [f for f in os.listdir(images_dir) if f.endswith('.jpg') or f.endswith('.jpeg')]
   print(images)
   return jsonify(images)



if __name__ == '__main__':
   app.run(debug = True)

