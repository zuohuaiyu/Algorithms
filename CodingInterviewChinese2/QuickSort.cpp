#include <bits/stdc++.h>
using namespace std;

int RandomInRange(int start, int end)
{
    int randNum = (rand() % (end - start + 1)) + start;
    return randNum;
}

int Partition(int data[], int start, int end, int length)
{
    if (data == NULL || start < 0 || end >= length || length <= 0)
    {
        printf("Invalid Parameters");
        return -1;
    }
    int index = RandomInRange(start, end);

    swap(data[index], data[end]);
    int smallNumIndex = -1;
    for (int i = start; i < end; ++i)
    {
        if (data[i] < data[end])
        {
            ++smallNumIndex;
            if (i != smallNumIndex)
                swap(data[i], data[smallNumIndex]);
        }
    }
    ++smallNumIndex;
    swap(data[end], data[smallNumIndex]);
    return smallNumIndex;
}

int LowPartition(int data[], int start, int end, int length)
{
    if (data == NULL || start < 0 || end >= length || length <= 0)
    {
        printf("Invalid Parameters");
        return -1;
    }
    int temp = data[start];
    while (start < end)
    {
        while (start < end && data[start] > temp)
            --end;
        data[start] = data[end];
        while (start < end && data[start] <= temp)
            ++start;
        data[end] = data[start];
    }
    data[start] = temp;
    return start;
}

void QuickSort(int data[], int start, int end, int length)
{
    if (start == end)
        return;
    int index = LowPartition(data, start, end, length);
    if (index > start)
        QuickSort(data, start, index - 1, length);
    if (index < end)
        QuickSort(data, index + 1, end, length);
}

int main()
{
    int data[] = {9, 1, 3, 4, 5, 6};
    QuickSort(data, 0, 5, 6);
    for (int i = 0; i < sizeof(data) / sizeof(data[0]); i++)
    {
        printf("%d ", data[i]);
    }
}