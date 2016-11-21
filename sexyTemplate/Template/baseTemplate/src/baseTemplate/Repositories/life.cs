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
    public class life
    {
        private IDbConnection Connection { get; set; }

        public life(NpgsqlConnection connection)
        {
            Connection = connection;
        }

        public IEnumerable<Cell> Cells(string saveName)
        {
            String sql = "select * from public.cell where \"saveName\"='" + saveName + "'";
            return Connection.Query<Cell>(sql);
        }


    }
}
