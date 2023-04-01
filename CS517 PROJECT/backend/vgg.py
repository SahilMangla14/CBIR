import numpy as np
import os
import cv2
import shutil
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
model = VGG16(weights='imagenet', include_top=False)

def extract_features(img_path, model):
    img = cv2.imread(img_path)
    img = cv2.resize(img, (224, 224))
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)
    features = model.predict(img)
    features = features.reshape((-1,))
    return features

def retrieve_similar_images(query_path, dataset_path, model, top_k=5):
    query_features = extract_features(query_path, model)
    dataset_files = os.listdir(dataset_path)
    similarities = []
    for filename in dataset_files:
        for files in os.listdir(os.path.join(dataset_path, filename)):
            if files.endswith('.jpg') or files.endswith('.jpeg'):
                filepath = os.path.join(dataset_path, filename)
                filepath = os.path.join(filepath, files)
                features = extract_features(filepath, model)
                similarity = np.dot(query_features, features) / (np.linalg.norm(query_features) * np.linalg.norm(features))
                similarities.append((filepath, similarity))
    similarities.sort(key=lambda x: x[1], reverse=True)
    top_k_results = similarities[:top_k]
    return top_k_results


def run_vgg():
    query_path = './static/queries/q.jpg'
    dataset_path = './dataset'
    top_k = 5
    print("hurray")
    results = retrieve_similar_images(query_path, dataset_path, model, top_k)
    i=1
    # dst_dir='./res'
    dst_dir = './static'
    # print(results)
    for filename, similarity in results:
        ext=filename[filename.rfind('.')+1:]
        shutil.copy(filename, f'{dst_dir}/img{i}.{ext}')
        i+=1
        
# run_vgg()