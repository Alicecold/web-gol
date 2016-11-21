using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using baseTemplate.Repositories;
using Npgsql;
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace baseTemplate.Controllers.webbAPI
{
    public class CellsController : Controller
    {
        [Route("api/[controller]")]
        // GET: /<controller>/
        public bool[,] Default()
        {
            //width,height
            String ConnectionString = "User ID-postgres;Password=dataMiner;Host=localhost;Port=5432;Database=life;Pooling=true";
            NpgsqlConnection connection = new NpgsqlConnection(ConnectionString);
            connection.Open();
            using (connection)
            {
                Life repo = new Life();
                List<Cell> dbcells = repo.Cells("first").ToList();
            }




            bool[,] cells = new bool[100, 60];
            Random rand = new Random();
            for (int x = 0; x < 100; x++)
            {
                for (int y = 0; y < 60; y++)
                {
                    cells[x, y] = Convert.ToBoolean(rand.Next(0, 2));
                }
            }
            return cells;
        }
    }

    internal class Life
    {
    }

}
