// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRouteHandler.cs" company="KriaSoft LLC">
//   Copyright © 2013 Konstantin Tarkus, KriaSoft LLC. See LICENSE.txt
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace App.Web.Routing
{
    using System;
    using System.Web;
    using System.Web.Routing;
    using System.Web.WebPages;

    public class DefaultRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            // Use cases:
            //     ~/            -> ~/views/index.cshtml
            //     ~/about       -> ~/views/about.cshtml or ~/views/about/index.cshtml
            //     ~/views/about -> ~/views/about.cshtml
            //     ~/xxx         -> ~/views/404.cshtml
            var filePath = requestContext.HttpContext.Request.AppRelativeCurrentExecutionFilePath;

            if (filePath == "~/")
            {
                filePath = "~/views/index.cshtml";
            }
            else
            {
                if (!filePath.StartsWith("~/views/", StringComparison.OrdinalIgnoreCase))
                {
                    filePath = filePath.Insert(2, "views/");
                }

                if (!filePath.EndsWith(".cshtml", StringComparison.OrdinalIgnoreCase))
                {
                    filePath = filePath += ".cshtml";
                }
            }

            var handler = WebPageHttpHandler.CreateFromVirtualPath(filePath); // returns NULL if .cshtml file wasn't found

            if (handler == null)
            {
                requestContext.RouteData.DataTokens.Add("templateUrl", "/views/404");
                handler = WebPageHttpHandler.CreateFromVirtualPath("~/views/404.cshtml");
            }
            else
            {
                requestContext.RouteData.DataTokens.Add("templateUrl", filePath.Substring(1, filePath.Length - 8));
            }

            return handler;
        }
    }
}