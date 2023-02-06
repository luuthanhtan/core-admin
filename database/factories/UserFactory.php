<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
// use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function getFullName() {
        $firstName = [
            "Huy", "Khang", "Bảo", "Minh", "Anh", "Khoa", "Phát", "Đạt", "Khôi", "Long", "Duy", "Quân", "Kiệt", "Thịnh",
            "Tuấn", "Hưng", "Hoàng", "Hiếu", "Nhân", "Trí", "Tài", "Phong", "Nguyên", "An", "Phú", "Thành", "Đức",
            "Dũng", "Lộc", "Thiện", "Hào", "Hải", "Quang",
        ];
        $middleName = ["Quốc", "Thành", "Tuấn", "Tấn", "Đức", "Quang", "Văn", "Đăng", "Duy", "Trung",];
        $lastName = [
            "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Võ", "Phan", "Trương", "Bùi", "Đặng", "Đỗ", "Ngô", "Hồ", "Dương", 
            "Đinh", "Đoàn", "Lâm", "Mai", "Trịnh", "Đào", "Cao", "Lý", "Hà", "Lưu", "Lương", "Thái", "Châu", "Tạ", 
            "Phùng", "Tô", "Vương", "Văn", "Tăng", "Quách", "Lại", "Hứa", "Thạch", "Diệp", "Từ",
        ];

        $randKeyFirstName = array_rand($firstName, 1);
        $randKeyMiddleName = array_rand($middleName, 1);
        $randKeyLastName = array_rand($lastName, 1);

        return $lastName[$randKeyLastName]. " " . $middleName[$randKeyMiddleName] . " " . $firstName[$randKeyFirstName];
    }

    public function getEmailSafe($name) {
        $unicode = array(
            'a'=>'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
            'd'=>'đ',
            'e'=>'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
            'i'=>'í|ì|ỉ|ĩ|ị',
            'o'=>'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
            'u'=>'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
            'y'=>'ý|ỳ|ỷ|ỹ|ỵ',
            'A'=>'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
            'D'=>'Đ',
            'E'=>'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
            'I'=>'Í|Ì|Ỉ|Ĩ|Ị',
            'O'=>'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
            'U'=>'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
            'Y'=>'Ý|Ỳ|Ỷ|Ỹ|Ỵ',
        );

        foreach($unicode as $nonUnicode=>$uni){
            $name = preg_replace("/($uni)/i", $nonUnicode, $name);
        }

        return str_replace(' ', '', strtolower($name)) . "@examaple.com";
    }
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->getFullName();

        return [
            'name' => $name,
            'email' => $this->getEmailSafe($name),
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'), // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
