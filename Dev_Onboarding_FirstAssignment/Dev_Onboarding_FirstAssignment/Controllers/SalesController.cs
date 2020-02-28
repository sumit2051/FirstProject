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
using System.Globalization;

namespace Dev_Onboarding_FirstAssignment.Controllers
{
    public class SalesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @" select 
                            dbo.Sales.Id, dbo.Product.Name as ProductName, dbo.Customer.Name as CustomerName, dbo.Store.Name as StoreName, convert(varchar(10), DateSold, 120) as DateSold 
                            from dbo.Sales 
                            INNER JOIN dbo.Product ON dbo.Sales.ProductId = dbo.Product.Id
                            INNER JOIN dbo.Customer ON dbo.Sales.CustomerId = dbo.Customer.Id
                            INNER JOIN dbo.Store ON  dbo.Sales.StoreId= dbo.Store.Id
                            ";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(Sales sale)
        {
            try
            {
                DataTable table = new DataTable();

                string datesold = sale.DateSold.ToString().Split(' ')[0];
                string[] sa = datesold.Split('/');
                string strAdd = sa[2] + "-" + sa[1] + "-" + sa[0];

                string query = @" insert into dbo.Sales (ProductId, CustomerId, StoreId, DateSold) values (
                '" + sale.ProductId + @"'
                ,'" + sale.CustomerId + @"'
                  ,'" + sale.StoreId + @"'
                ,'" + strAdd + @"') ";

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

        public string Put(Sales sale)
        {
            try
            {
                DataTable table = new DataTable();

                string datesold = sale.DateSold.ToString().Split(' ')[0];
                string[] sa = datesold.Split('/');
                string strNew = sa[2] + "-" + sa[1] + "-" + sa[0];

                string query = @" 
                update dbo.Sales set 
                ProductId = '" + sale.ProductId + @"'
                , CustomerId = '" + sale.CustomerId + @"' 
                 , StoreId = '" + sale.StoreId + @"' 
                 , DateSold = '" + strNew + @"' 
                where Id = " + sale.Id + @"                 
                ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["Dev_Talent_Onboarding"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }


                return "Updated Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }

        public string Delete (Sales sale)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" 
                delete from dbo.Sales 
                where Id = " + sale.Id + @"                 
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
