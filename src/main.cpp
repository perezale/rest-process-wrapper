#include <iostream>

#include <thread>
#include <chrono>

using namespace std;

int main()
{
  std::this_thread::sleep_for(std::chrono::milliseconds(5000));
  cout << "Hello world 0!" << endl;
  return 0;
}
