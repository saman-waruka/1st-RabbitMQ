
step1: use command "docker-compose up" to run docker container
step2: ssh into node service go to directory usr/app
step3: use command "node reciever.js" to run reciever.js wait for incoming message
step4: use another ssh into node service go to directory usr/app 
step5: use command "node sender.js" to run sender.js these step will publish message,  you will see new message on ssh tereminal in step 4
