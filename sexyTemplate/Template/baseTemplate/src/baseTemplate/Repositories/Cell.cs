using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace baseTemplate.Repositories
{
    public class Cell
    {
        public bool isAlive { get; set; }
        public int xPos { get; set; }
        public int yPos { get; set; }
        public string saveName { get; set; }
    }
}
