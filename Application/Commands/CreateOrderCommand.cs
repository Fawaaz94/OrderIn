using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using MediatR;

namespace Application.Commands
{
    public class CreateOrderCommand: IRequest<string>
    {
        public int Total { get; set; }
        public IList<MenuItem> SelectedItems { get; set; }
    }

    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, string>
    {
        public async Task<string> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            return await Task.FromResult<string>( "Success");
        }
    }

}
