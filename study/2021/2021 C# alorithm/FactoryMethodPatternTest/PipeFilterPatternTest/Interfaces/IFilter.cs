namespace PipeFilterPatternTest.Interfaces
{
    public interface IFilter<T>
    {
        T Execute(T data);
    }
}
