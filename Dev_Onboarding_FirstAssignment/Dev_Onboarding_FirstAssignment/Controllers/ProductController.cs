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
    public class ProductController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @" select * from dbo.Product ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Product pro)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" insert into dbo.Product values (
                '" + pro.Name + @"'
                ,'" + pro.Price + "') ";

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

        public string Put(Product pro)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                update dbo.Product set 
                Name = '" + pro.Name + @"'
                , Price = '" + pro.Price + @"' 
                where Id = " + pro.Id + @"                 
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

        public string Delete(Product pro)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                 delete from dbo.Product 
                where Id = " + pro.Id + @"                 
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
