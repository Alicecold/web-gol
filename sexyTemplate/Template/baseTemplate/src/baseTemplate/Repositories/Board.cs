using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace baseTemplate.Repositories
{
    public class Board
    {
        public string saveName { get; set; }
        public DateTime saveDate { get; set; }
        public int width { get; set; }
        public int height { get; set; }
    }
}
