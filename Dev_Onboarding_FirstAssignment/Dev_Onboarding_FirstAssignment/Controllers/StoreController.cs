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
    public class StoreController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @" select * from dbo.Store ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(Store sto)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" insert into dbo.Store values (
                '" + sto.Name + @"'
                ,'" + sto.Address + "') ";

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

        public string Put(Store sto)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                update dbo.Store set 
                Name = '" + sto.Name + @"'
                , Address = '" + sto.Address + @"' 
                where Id = " + sto.Id + @"                 
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

        public string Delete(Store sto)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                 delete from dbo.Store 
                where Id = " + sto.Id + @"                 
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
