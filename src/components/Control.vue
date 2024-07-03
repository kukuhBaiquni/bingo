<template>
  <div
    className="justify-self-end fixed bottom-0 h-[100px] bg-indigo-900 w-full"
  >
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="min-w-[360px] h-full flex items-center justify-center gap-x-4"
      >
        <button
          type="button"
          className="bg-indigo-600 text-white w-[50px] h-[50px] rounded-full"
        >
          <i class="ri-mic-fill text-xl"></i>
        </button>
        <button
          type="button"
          className="bg-indigo-600 text-white w-[50px] h-[50px] rounded-full"
        >
          <i class="ri-video-on-fill text-xl"></i>
        </button>
        <button
          type="button"
          className="bg-red-500 text-white w-[50px] h-[50px] rounded-full"
        >
          <i class="ri-phone-fill text-xl"></i>
        </button>
      </div>
    </div>
  </div>
</template>
