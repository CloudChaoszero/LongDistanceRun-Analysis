<<<<<<< HEAD
#from __future__ import print_statement
import time
# import swagger_client
# from swagger_client.rest import ApiException 
from pprint import pprint
import gpxpy
=======
'''
###If Strava API works, implement these imports again and retest
#from __future__ import print_statement
# import swagger_client
# from swagger_client.rest import ApiException 
'''


#Import modules
import time
from pprint import pprint
import gpxpy #Import library to work with GPX files 
import numpy as np
from pandas import DataFrame
import pandas as pd

>>>>>>> DistanceCalculation

gpx_file = open('GPXData/Morning_Run.gpx','r')
gpx = gpxpy.parse(gpx_file)

<<<<<<< HEAD
=======
'''
###Setup to go through GPX data and visualize said data
>>>>>>> DistanceCalculation
# lat =[]
# lon =[]

# for track in gpx.tracks:
#     for segment in track.segments:
#         for point in segment.points:
#             lat.append(point.latitude)
#             lon.append(point.longitude)
# print(list(zip(lat,lon)))

# import matplotlib.pyplot as plt
# fig = plt.figure(facecolor='0.5')
# ax = plt.Axes(fig,[0,0,1,1])
# ax.set_aspect('equal')
# ax.set_axis_off()
# fig.add_axes(ax)
# plt.plot(lon,lat,color='blue',lw=-0.2,alpha=0.8)
# plt.show()
<<<<<<< HEAD
data =[]

=======
'''

#Gather data into dataframe
data =[]
>>>>>>> DistanceCalculation
for track in gpx.tracks:
    for segment in track.segments:
        for point in segment.points:
            data.append([point.time,\
            point.latitude,point.longitude,\
            point.elevation,point.speed])

<<<<<<< HEAD
from pandas import DataFrame
columns = ['Time','Latitude','Longitude',\
            'Elevation','Speed']
df = DataFrame(data,columns =columns)
print(df.head())

'''
To Evaluate speed, need calculation
using trigonometry
https://www.google.com/search?ei=-SgeW5_JCpHK8AOOyKHICw&q=distance+between+two+longitude+and+latitude+points+in+miles&oq=distance+between+two+longitude+and+latitude+points+in+miles&gs_l=psy-ab.3..0i22i30k1l2.1352.2675.0.2771.9.9.0.0.0.0.125.652.6j1.7.0....0...1.1.64.psy-ab..2.7.650...0.0.jzsu6FyOlW4
'''

df.to_csv('Data/MorningRun-061118.csv', \
index=False, columns = columns)

=======
columns = ['Time','Latitude','Longitude',\
            'Elevation','Speed']
df = DataFrame(data,columns =columns)
df['Time'] = pd.to_datetime(df['Time']) 


def distanceCalculation(long, lat):
    R = 6371
    long_radians = np.radians(long).values
    lat_radians = np.radians(lat).values

    a = [(np.sin((lat_radians[i]-lat_radians[i-1])/2))**2 \
                         +(np.cos(lat_radians[i-1]) \
                            *np.cos(lat_radians[i])) \
                 * (np.sin((long_radians[i]-long_radians[i-1])/2))**2 \
                 for i in range(1,len(long_radians))]
    a_minus1 = [1-a[i] for i in range(len(a))]
    c = 2 * (np.arctan2(np.sqrt(a) , np.sqrt(a_minus1)))
    d= R * c 
    d_miles = d * 0.621371
    return(d_miles)
def timeIntervals(timeArray):
    #Given datetime array, then compute information
    return([((timeArray[i]-timeArray[i-1]).total_seconds() /3600) for i in range(1,len(timeArray))])
    #return([((timeArray[i].total_seconds-timeArray[i-1]).total_seconds/3600 ) for i in range(1,len(timeArray))])
def speedCalculation(calculatedDifference, calculatedTimeInterval):
    return([calculatedDifference[i] / calculatedTimeInterval[i] for i in range(len(calculatedTimeInterval))])

#Calculate Speed and input array into dataframe
calc_Dist = distanceCalculation(df['Longitude'],df['Latitude'])
calc_Time = timeIntervals(df['Time'])
velocity = speedCalculation(dist,timer)
velocity.insert(0,0)
#df.drop('Speed', axis=1, inplace=True)
df['Speed'] = velocity


#Export file to csv
df.to_csv('Data/MorningRun-061118.csv', \
index=False, columns = columns)
>>>>>>> DistanceCalculation
