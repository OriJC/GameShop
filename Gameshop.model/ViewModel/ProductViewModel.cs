using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gameshop.model.ViewModel
{
    public class ProductViewModel
    {
        public Product product { get; set; }
        public byte[] imageData { get; set; }
        public string imageContentType { get; set; }
    }
}
