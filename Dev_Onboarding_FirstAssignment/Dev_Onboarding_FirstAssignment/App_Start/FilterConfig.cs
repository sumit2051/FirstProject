using System.Web;
using System.Web.Mvc;

namespace Dev_Onboarding_FirstAssignment
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
