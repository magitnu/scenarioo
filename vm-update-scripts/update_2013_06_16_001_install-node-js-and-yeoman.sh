#!/bin/sh
sudo apt-get update
sudo apt-get -y install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get -y install nodejs
sudo npm install -g yo grunt-cli bower karma
sudo npm install -g generator-webapp
sudo npm install -g generator-angular


