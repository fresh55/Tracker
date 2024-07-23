using Backend.src.Application.Common.Interfaces;
using Backend.src.Domain.Entities;
using Moq;
using Xunit;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Backend.src.Application.Balances2;
using Backend.src.Application.Balances2.Commands.AddIncome;
using MediatR;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Backend.UnitTests.Application
{
    public class BalanceServiceTests
    {
        private readonly Mock<IApplicationDbContext> _mockContext;
        private readonly Mock<IUser> _mockCurrentUser;
        private readonly Mock<IMediator> _mockMediator;
        private readonly Mock<IMapper> _mockMapper;

        public BalanceServiceTests()
        {
            _mockContext = new Mock<IApplicationDbContext>();
            _mockCurrentUser = new Mock<IUser>();
            _mockMediator = new Mock<IMediator>();
            _mockMapper = new Mock<IMapper>();
        }

        [Fact]
        public async Task AddIncome_ShouldIncreaseBalance()
        {
            // Arrange
            var userId = "testUser";
            var amount = 100m;
            var description = "Test Income";
            var date = DateTime.Now;

            var balance = new Balance { ApplicationUserId = userId, TotalAmount = 500m };
            var balances = new List<Balance> { balance }.AsQueryable();

            var mockSet = new Mock<DbSet<Balance>>();
            mockSet.As<IAsyncEnumerable<Balance>>()
                .Setup(m => m.GetAsyncEnumerator(It.IsAny<CancellationToken>()))
                .Returns(new TestAsyncEnumerator<Balance>(balances.GetEnumerator()));

            mockSet.As<IQueryable<Balance>>()
                .Setup(m => m.Provider)
                .Returns(new TestAsyncQueryProvider<Balance>(balances.Provider));

            mockSet.As<IQueryable<Balance>>().Setup(m => m.Expression).Returns(balances.Expression);
            mockSet.As<IQueryable<Balance>>().Setup(m => m.ElementType).Returns(balances.ElementType);
            mockSet.As<IQueryable<Balance>>().Setup(m => m.GetEnumerator()).Returns(balances.GetEnumerator());
            _mockContext.Setup(c => c.Balances).Returns(mockSet.Object);
            _mockCurrentUser.Setup(u => u.Id).Returns(userId);

            var handler = new AddIncomeCommandHandler(_mockContext.Object, _mockMapper.Object);
            var command = new AddIncomeCommand
            {
                Amount = amount,
                Title = description,
                Category = "Test",
                DateAdded = date,
                UserId = userId
            };

            var expectedIncomeDto = new IncomeDto { Amount = amount, Title = description, Category = "Test", Date = date };
            _mockMapper.Setup(m => m.Map<IncomeDto>(It.IsAny<Income>())).Returns(expectedIncomeDto);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().BeEquivalentTo(expectedIncomeDto);
            balance.TotalAmount.Should().Be(600m);
            mockSet.Verify(m => m.Add(It.IsAny<Balance>()), Times.Never());
            _mockContext.Verify(m => m.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once());
        }
    }
}
internal class TestAsyncQueryProvider<TEntity> : IAsyncQueryProvider
{
    private readonly IQueryProvider _inner;

    internal TestAsyncQueryProvider(IQueryProvider inner)
    {
        _inner = inner;
    }

    public IQueryable CreateQuery(Expression expression)
    {
        return new TestAsyncEnumerable<TEntity>(expression);
    }

    public IQueryable<TElement> CreateQuery<TElement>(Expression expression)
    {
        return new TestAsyncEnumerable<TElement>(expression);
    }

    public object? Execute(Expression expression)
    {
        return _inner.Execute(expression);
    }

    public TResult Execute<TResult>(Expression expression)
    {
        return _inner.Execute<TResult>(expression);
    }

    public TResult ExecuteAsync<TResult>(Expression expression, CancellationToken cancellationToken = default)
    {
        var expectedResultType = typeof(TResult).GetGenericArguments()[0];
        var executionResult = typeof(IQueryProvider)
            .GetMethod(
                name: nameof(IQueryProvider.Execute),
                genericParameterCount: 1,
                types: new[] { typeof(Expression) })
            ?.MakeGenericMethod(expectedResultType)
            ?.Invoke(this, new[] { expression });

        return (TResult)(typeof(Task).GetMethod(nameof(Task.FromResult))
            ?.MakeGenericMethod(expectedResultType)
            ?.Invoke(null, new[] { executionResult }) ?? Task.FromResult(default(TResult))!);
    }
}

internal class TestAsyncEnumerable<T> : EnumerableQuery<T>, IAsyncEnumerable<T>, IQueryable<T>
{
    public TestAsyncEnumerable(IEnumerable<T> enumerable)
        : base(enumerable)
    { }

    public TestAsyncEnumerable(Expression expression)
        : base(expression)
    { }

    public IAsyncEnumerator<T> GetAsyncEnumerator(CancellationToken cancellationToken = default)
    {
        return new TestAsyncEnumerator<T>(this.AsEnumerable().GetEnumerator());
    }
}

internal class TestAsyncEnumerator<T> : IAsyncEnumerator<T>
{
    private readonly IEnumerator<T> _inner;

    public TestAsyncEnumerator(IEnumerator<T> inner)
    {
        _inner = inner;
    }

    public T Current
    {
        get
        {
            return _inner.Current;
        }
    }

    public ValueTask<bool> MoveNextAsync()
    {
        return new ValueTask<bool>(_inner.MoveNext());
    }

    public ValueTask DisposeAsync()
    {
        _inner.Dispose();
        return new ValueTask();
    }
}