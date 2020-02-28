using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Dev_Onboarding_FirstAssignment.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;


namespace Dev_Onboarding_FirstAssignment.Controllers
{
    
    public class CustomerController : ApiController
    {
        public HttpResponseMessage Get()
        {
            
            DataTable table = new DataTable();

            string query = @" select Id,Name,Address from dbo.Customer ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Customer cus)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" insert into dbo.Customer values (
                '" + cus.Name + @"'
                ,'" + cus.Address + "') ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Added Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }
        public string Put (Customer cus)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                update dbo.Customer set 
                Name = '" + cus.Name + @"'
                , Address = '" + cus.Address + @"' 
                where Id = " + cus.Id + @"                 
                ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Added Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }

        public string Delete(Customer cus)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                 delete from dbo.Customer 
                where Id = " + cus.Id + @"                 
                ";


                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Deleted Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }
        }
    }
}
