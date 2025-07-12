export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          🎉 Chào mừng đến với <span className="text-blue-600">Ứng dụng PTPMQL</span>
        </h1>

        <p className="text-gray-700 text-lg mt-2">
          🚀 Đây là trang chủ của ứng dụng <span className="font-semibold">PTPMQL</span>.
        </p>

        <p className="text-gray-700 text-lg mt-2">
          🧭 Hãy sử dụng các liên kết điều hướng ở trên để truy cập các chức năng khác nhau.
        </p>

        <p className="text-gray-700 text-lg mt-2">
          ✨ Chọn một mục trong thanh điều hướng để bắt đầu trải nghiệm.
        </p>

        <p className="text-gray-700 text-lg mt-2">
          📘 Để biết thêm thông tin, vui lòng tham khảo tài liệu hoặc liên hệ với bộ phận hỗ trợ.
        </p>

        <p className="text-gray-700 text-lg mt-2">
          🙌 Cảm ơn bạn đã sử dụng <span className="text-purple-600 font-medium">ứng dụng của chúng tôi</span>!
        </p>

        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300">
            Bắt đầu ngay
          </button>
        </div>
      </div>
    </div>
  );
}
