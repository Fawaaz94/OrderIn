using Application.Commands;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace OrderIn.API.Controllers
{
    public class OrderController : BaseController
    {
        [HttpPost]
        public async Task<string> Post(CreateOrderCommand command)
        {
            //return await Task.FromResult("Success");
            var result = await Mediator.Send(command);
            return result;
        }
    }
}
