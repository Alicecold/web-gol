using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using Dapper;
using baseTemplate.Repositories;

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
            string sql = "select * from public.cell where \"saveName\"='" + saveName + "'";
            return Connection.Query<Cell>(sql);
        }

        public Board Board(string saveName)
        {
            string sql = "select * from public.board where board.\"saveName\"='" + saveName + "'";
            return Connection.Query<Board>(sql).First();
        }

        public Board[] Boards()
        {
            string sql = "select * from public.board";
            return Connection.Query<Board>(sql).ToList().ToArray();
        }

        public void CreateBoard(bool[] cells, string saveName,int width,int height)
        {
            string sql = "insert into public.board(\"saveName\",\"saveDate\",\"width\",\"height\") values(" +
            "@saveName,@saveDate,@width,@height)";
            Connection.Execute(
                sql,
                new { saveName = saveName, saveDate = DateTime.Now, width = width, height = height }
            );

            sql = "insert into public.cell(\"isAlive\",\"xPos\",\"yPos\",\"saveName\") values(" +
            "@isAlive,@xPos,@yPos,@saveName)";
            for (int x = 0; x < width; x++)
            {
                for (int y = 0; y < height; y++)
                {
                    Connection.Execute(
                        sql,
                        new { isAlive = cells[x + (y * width)], xPos = x, yPos = y, saveName = saveName }
                    );
                }
            }

        }
    }
}
