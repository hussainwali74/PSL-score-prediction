0. 
# setup db
docker-compose build
docker-compose up -d

this will create the mongodb db in local docker

1. 
# create filters 
link: http://localhost:3000/create-filters
enter a grade, topic and subtopic and click add Filters button, this will add filters to db

2.
# create Questions
link: http://localhost:3000/

select the grade, topic and enter subtopic and click generate button, wait for the response from LLm, 
Once the generation is complete it will appear on the page below the filters in a list

environment variables:
in .env have these variables:

OPENAI_API_KEY=
OPENAI_ORG_KEY=
MONGO_DB_HOST=mongodb://localhost:27017

remember to add the values of the openaikey and organization key and mongodb url

