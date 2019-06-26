# What is lightomate ?

Lightomate is an automation tool to audit your internal ( protected ) and external pages. It uses puppeteer as browser and lighthouse to audit pages.  

# Steps to use lightomate:

1. Clone the repo.
2. cd to cloned repo. Example : "cd lightomate"
3. Run "npm install" to install dependencies.
4. Configure code. [ There are comments which will help configure the code.]
5. Run "npm start"
6. Once audit is complete. You can find the page report json in your target report directory.

# FAQ : 

## 1: How to get the css selector for email input, password input and sumbit button ? 

1. Right click on html element and click on Inspect Elements.
2. Right click on html element in inspector tab -> Select copy -> select CSS Selector.
3. Paste it in appropriate replace_me placeholder in > index.js. 

## 2: How to setup it on EC2 instance ?

1. Clone the repo.
2. Run following commands. These are the dependencies of puppeteer and lighthouse for EC2 instance.
  *  sudo yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
  *  sudo yum update nss -y
3. cd to cloned repo.
4. Run "npm install" to install dependencies.
5. Configure code. [ There are comments which will help configure the code.] 
6. Run "npm start"
7. Once audit is complete. You can find the page report json in your target report directory. 



   
