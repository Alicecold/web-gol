using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Npgsql;
using Dapper;

namespace baseTemplate.Repositories
{
    public class Life
    {
        private IDbConnection Connection { get; set; }

        public Life(NpgsqlConnection connection)
        {
            Connection = connection;
        }

        public IEnumerable<Cell> Cells(string saveName)
        {
            String sql = "select * from public.cell where \"saveName\"='" + saveName + "'";
            return Connection.Query<Cell>(sql);
        }

        public Board Board(string saveName)
        {
            String sql = "select * from public.board where \"saveName\"='" + saveName + "'";
            return Connection.Query<Board>(sql).First();
        }

        public string[] Boards()
        {
            string sql = "select * from public.board";
            List<Board> boards = Connection.Query<Board>(sql).ToList();
            string[] boardArray = new string[boards.Count];
            for(int index=0; index<boards.Count; index++)
            {
                boardArray[index] = boards[index].saveName + " " + boards[index].saveDate.ToString();
            }

            return boardArray;
        }
    }
}
