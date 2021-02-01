using Application.Common.Interfaces;
using System;

namespace Infrastructure.Services
{
    public class MachineDateTime: IDateTime
    {
        public DateTime Now => DateTime.Now;

        public int CuurentYear => DateTime.Now.Year;
    }
}
