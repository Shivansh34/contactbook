# Contactbook

The app has CRUD APIs for contacts of a user and create options for a user.

To create a user sent a POST request to /profile/create with the body as 
{

	"username":*username*,
	"password":*password*,

}

All POST request to perform CRUD operations must have basic authentication headers of user.
> use('username:"Shivansh",'password':"pass") for tests.

To create a contact send a POST request to private/contacts/create, and the body should have a json format of

{

	"name":*Name*,
	"email":*email*,
	"phonenumber":*Phone number*,
	"address":*address*
	
}

To read contacts send a POST request to private/contacts to get all contacts.

  
To update contact sent a POST request to private/contacts/update with the body as->
  
{

  	"contactid":*the _id parameter received on querying the database*,
	"name":*Name*,
	"email":*email*,
	"phonenumber":*Phone number*,
	"address":*address*
	
}
  
To delete a contact send POST request to private/contacts/delete with the body as->
{

 	"contactid":*the _id parameter received on querying the database*,
  
}
  
The search queries limit themselves to 10 results per operations.

To perform search operations with name send a POST request to private/contacts/search/name with the body as->
{

 	"name":*search parameters*,
  
}
  
To perform search operations with email send a POST request to private/contacts/search/email with the body as->
{

 	"email":*search parameters*,
  
}
