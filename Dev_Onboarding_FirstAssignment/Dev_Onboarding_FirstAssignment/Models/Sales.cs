using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dev_Onboarding_FirstAssignment.Models
{
    public class Sales
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int CustomerId { get; set; }

        public int StoreId { get; set; }

        public DateTime? DateSold { get; set; }

        public virtual Product Products { get; set; }

        public virtual Customer Customers { get; set; }

        public virtual Store Stores { get; set; }
    }
}