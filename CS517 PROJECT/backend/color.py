import cv2
import numpy as np
import os
import shutil
from sklearn.metrics import pairwise
from sklearn.preprocessing import MinMaxScaler

def run_color():
    dataset_path = "./dataset"
    dataset_images = []
    img_names = []
    for filename in os.listdir(dataset_path):
        # print(filename)
        for files in os.listdir(os.path.join(dataset_path, filename)):
            img = cv2.imread(os.path.join(dataset_path, filename, files))
            img=cv2.resize(img, (500,500))
            dataset_images.append(img)
            img_names.append(os.path.join(dataset_path, filename, files))


    # Load the query image
    query_image = cv2.imread("./static/queries/q.jpg")
    # Extract the color features of the query image
    query_features = extract_color_features(query_image)

    # Extract the color features of all the images in the dataset
    dataset_features = [extract_color_features(img) for img in dataset_images]

    # Compute the similarity between the query image and all the images in the dataset
    similarities = compute_similarity(query_features, dataset_features)

    # Sort the images in the dataset by their similarity to the query image
    indices = np.argsort(similarities)

    # cv2.imshow("input", query_image)
    # Show the top K results
    K = 7
    results = []
    for i in range(K):
        result_image = dataset_images[indices[i]]
        results.append(img_names[indices[i]])
        # cv2.imshow(f"Result {i+1}", result_image)
    # print(result_image)    
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # print(results)
    # dst_dir = './res'
    dst_dir = './static'
    i = 1
    print(results)
    for filename in results:
        ext=filename[filename.rfind('.')+1:]
        shutil.copy(filename, f'{dst_dir}/img{i}.{ext}')
        i+=1

# print(len(dataset_images))
def extract_color_features(image):
    # Convert the image to the HSV color space
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define the ranges of the histogram bins for each channel
    h_ranges = s_ranges = v_ranges = [0, 256]
    
    # Compute the color histograms for each channel
    h_hist = cv2.calcHist([hsv_image], [0], None, [256], h_ranges)
    s_hist = cv2.calcHist([hsv_image], [1], None, [256], s_ranges)
    v_hist = cv2.calcHist([hsv_image], [2], None, [256], v_ranges)
    
    # Normalize the histograms to have a maximum value of 1
    cv2.normalize(h_hist, h_hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    cv2.normalize(s_hist, s_hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    cv2.normalize(v_hist, v_hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)
    
    # Concatenate the histograms into a single feature vector
    features = np.concatenate((h_hist, s_hist, v_hist)).flatten()
    
    return features
def compute_similarity(query_features, dataset_features):
    scaler = MinMaxScaler()
    dataset_features = scaler.fit_transform(dataset_features)
    query_features = scaler.transform(query_features.reshape(1, -1))

    dists = pairwise.euclidean_distances(query_features, dataset_features)
    return dists.flatten()
def perform_query(query_image, dataset_images, K=10):
    # Extract the color features of the query image
    query_features = extract_color_features(query_image)
    
    # Extract the color features of all the images in the dataset
    dataset_features = [extract_color_features(img) for img in dataset_images]
    
    # Compute the similarity between the query image and all the images in the dataset
    similarities = compute_similarity(query_features, dataset_features)
    
    # Sort the images in the dataset by their similarity to the query image
    indices = np.argsort(similarities)
    
    # Return the top K results
    return indices[:K]


# run_color()