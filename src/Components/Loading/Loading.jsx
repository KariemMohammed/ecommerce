import React from 'react'

export default function Loading() {
  return (
    <div class="flex flex-row gap-2 justify-center items-center h-screen">
  <div class="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
  <div class="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.3s]"></div>
  <div class="w-4 h-4 rounded-full bg-green-700 animate-bounce [animation-delay:.7s]"></div>
</div>

  )
}




