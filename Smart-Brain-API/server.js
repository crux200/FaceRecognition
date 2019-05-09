const express=require('express')
const bodyParser=require('body-parser');
const app=express();
const cors= require('cors');

app.use(bodyParser.json());
app.use(cors());

const database= 
{ 
	users: 
	[{
	id:101,
	name: "john",
	email: "john@gmail.com",
	password:"Jewel",
	entries:0,
	Joined: new Date()
	},
	{
	id:102,
	name: "molly",
	email:"molly@gmail.com",
	password:"shrek",
	entries:0,
	Joined: new Date()
	}]
}



app.get('/', (req,res)=>
{
	res.json(database.users);
})

app.post('/signin',(req,res)=>
{
if(req.body.email===database.users[0].email && req.body.password===database.users[0].password)
{
	res.json(database.users[0])
} 
else 
{
res.status(400).json('Error with log in. Try again')
}

})


app.post('/register',(req,res)=>
{
const { name,email, password } = req.body;
database.users.push (
{
	id: 103,
	name:name,
	email: email,
	password: password,
	entries:0,
	Joined: new Date()
})
	res.json(database.users[database.users.length-1]);
})


app.get('/profile/:id', (req,res)=>{
const { id }= req.params;
let present=false;
database.users.forEach(user=>
	{ if(user.id === Number(id)){
			res.json(user);
	 }
 })

if(!present){
	res.status(400).json("user doesnt exist");
}

})

app.put('/image', (req,res)=>{
const { id }= req.body;
let present=false;
database.users.forEach(user=>{
		if(user.id === Number(id)){
			present=true;
			user.entries++;
			res.json(user.entries);
		}
 })

if(!present){
	res.status(400).json("user doesnt exist");
}

})

app.listen(3000, ()=>{
	console.log("App is running on port 3000")
})


