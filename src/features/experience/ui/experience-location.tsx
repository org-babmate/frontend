function ExperienceLocation() {
  return (
    <div className="flex flex-col">
      <h1 className="text-headline-lg text-gray-600">장소를 설저애 주세요</h1>
      <div className="flex flex-col gap-8 mt-6">
        <h2 className="text-gray-600 text-body-xl">진행 장소</h2>
        <input type="text" />
        <h2 className="text-gray-600 text-body-xl">모임 장소</h2>
        <input type="text" />
      </div>
    </div>
  );
}

export default ExperienceLocation;
