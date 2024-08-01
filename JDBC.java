//connecting to Database with JDBC (java database connectivity)

//register the driver classs
Class.forName("oracle.jdbc.driver.OracleDriver");  

//create connection
Connection con=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe","system","password");  

// Create statement
Statement stmt=con.createStatement(); 

//execute Query
ResultSet rs=stmt.executeQuery("select * from emp");  
while(rs.next()){  

    System.out.println(rs.getInt(1)+" "+rs.getString(2));  

}
//close connection
con.close();


Class.forName("oracle.driver.jdbc.OracleDriver");
Connection connection=DriverManager.getConnection("connectionString");

Statement st=connection.createStatement();

ResultSet set=st.executeQuery("query");
while(set.next())
{
    //access elements
}


connection.close()



//initialize application in webcontainer 
init();
//handle requests 
service();
//destroy instance
destroy();



















