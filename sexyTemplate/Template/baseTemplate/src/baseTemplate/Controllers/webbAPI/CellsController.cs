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
    public struct ParamBoard
    {
        public bool[] Cells { get; set; }
        public string SaveName { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
    [Route("api/[controller]")]
    public class CellsController : Controller
    {

        [Route("[action]")]
        public bool[,] Load(string saveName)
        {
            string ConnectionString = "User ID=postgres;Password=Nisse;Host=localhost;Port=5432;Database=life;Pooling=true;";
            NpgsqlConnection connection = new NpgsqlConnection(ConnectionString);
            connection.Open();
            List<Cell> dbcells;
            Board board;
            using (connection)
            {
                Life repo = new Life(connection);
                dbcells = repo.Cells(saveName).ToList();
                board = repo.Board(saveName);
            }

            bool[,] cells = new bool[board.width, board.height];
            foreach (Cell cell in dbcells)
            {
                cells[cell.xPos, cell.yPos] = cell.isAlive;
            }
            return cells;
        }

        [Route("[action]")]
        // GET: /<controller>/
        public Board[] GetBoards()
        {
            string ConnectionString = "User ID=postgres;Password=Nisse;Host=localhost;Port=5432;Database=life;Pooling=true;";
            NpgsqlConnection connection = new NpgsqlConnection(ConnectionString);
            connection.Open();
            Board[] boards;
            using (connection)
            {
                Life repo = new Life(connection);
                boards = repo.Boards();
            }
            return boards;

        }

        //Saving
        [Route("[action]")]
        public bool Save([FromBodyAttribute] ParamBoard board)
        {
            bool[] cells = board.Cells;
            string saveName = board.SaveName;
            string ConnectionString = "User ID=postgres;Password=Nisse;Host=localhost;Port=5432;Database=life;Pooling=true;";
            NpgsqlConnection connection = new NpgsqlConnection(ConnectionString);
            connection.Open();
            using (connection)
            {
                Life repo = new Life(connection);
                repo.CreateBoard(cells, saveName, board.Width, board.Height);
            }
            return true;
        }
    }
}
