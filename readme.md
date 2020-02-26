# Step To run Part 1 : Hello World
  ## step1: 
  use command `docker-compose up` to run docker container
  ## step2: 
  ssh into node service go to directory usr/app, use command `cd usr/app/part1-helloworld`
  ## step3: 
  use command `node reciever.js` to run reciever.js wait for incoming message
  ## step4: 
  use another ssh into node service go to directory usr/app , use command `cd usr/app/part1-helloworld`
  ## step5: 
  use command `node sender.js` to run sender.js these step will publish message,  you will see new message on ssh terminal in step 4


# Step To run Part 2
  ## step1: 
  use command `docker-compose up` to run docker container
  ## step2: 
  ssh into node service go to directory usr/app, use command `cd usr/app/part2-work-queues`
  ## step3: 
  use command `node worker.js` to run worker.js wait for incoming message
  ## step4: 
  use another ssh into node service go to directory usr/app , use command `cd usr/app/part2-work-queues`
  ## step5: 
  use command `node new_task.js` to run new_task.js these step will publish message,  you will see new message on ssh terminal in step 4
