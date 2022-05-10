import React, { useState, useEffect } from "react";
import database from "./firebase";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";

function TinderCards() {
  const [people, setPeople] = useState([
    {
      name: "None left",
      text: "..........",
      url:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEBUSEBMSERMWEhIVEhIVEBAVFhISFxUWFhgWFxgYHSggGBolGxgWIjEhJSkrLi4uFx81ODMtOCgtLi0BCgoKDg0OGhAQGy0lICUtLSsvMC8tLS0tLy0vLS0tKy8tLS0tLS0tLS0uLS0tLy0tLS0vLS0tLS8tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwYEBQcCAQj/xABBEAACAQICBwQHBgMIAwEAAAAAAQIDEQQSBQYhMUFRYSJxgZETMlKhscHRB0JicpLhFLLSFiMkRFOi8PFDgqMz/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAQFAQMGAv/EADYRAAIBAgIHBwQBBAIDAAAAAAABAgMRBCEFEjFBUXGREzJhgbHB0SKh4fDxI0JDYgYVFCQz/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAABDVrRj60ox75JfEPIEwNdU0zQjvq0/CWb4EP9pML/q/7Kn9JoliaMO9OK5yS9WbVQqvZF9GbcGo/tLhf9X/51P6SalprDy3VoeLy/ERxVCTtGcXykn7mXh6q2wfRmxBBSrxn6k4y7pRfwJzes1c0tWyYAAAAAAAAAAAAAAAAAAAAAAAAAAABgaS0lToRvUl3RW2Uu5fMqGk9ZatW6g/RQ5RfaffL6EHFaQo4bKTu+C2/jzJVDCVK2ayXFltx+l6VD15q/srbLyW7xK/jNb5PZRppfim7vyW7zZWoUW/qyeOHS37SgraYxNTKForq+r+EWlPR9GHe+p/u4mr6bxE99Wa6ReVeUbGH6OT22b6v9zLUUt2w9FbNzqZzk3zbfqTY2irRVuRiLDy6eZ9/hnzXvMoHns0Lsxf4Z817zy8O+nmZgM6iF2YTpSXDyMqhpavT9WrNdG8y8ndHs8tX3mYa1N3g2uTa9BK0laSvzNxg9b5LZVhGa5x7L8nsfuN9gNM0a+yE+17Mtj8OD8CjSw6e7YQToNdSxo6XxNLv/UvHb1XumQ6mAoz2fS/3d/B1QHPdGaw1qNk36SHsye1f+29e9Fw0ZpeniF2HaXGD2SX1XVF/hNI0cTlHKXB+25+vgVWIwdSjm81xXvwNkACeRQAAAAAAAAAAAAAAAVzTusSo3hStKpuct8YfWXT/AKINZdPZL0qL7W6c193ouvN8O/dVaNHN3FDpLSupJ0aO3e+HgvHjw2bb2tMHgdZKpV2bl7v2Ps5TqycpNyk98myanRS6s9xjbYj0c6lve0t77gAD0YAAAAAAAAAAAAAAAIqlFPo+ZBaVOSabTT2STas+j4GYeWrnlxMplh0FrKp2p12lLdGe5S6Pk+u7uLScrrUbbVu+BZNWtP7qNZ7N1Ob4coy6cmX+jdKtvsq7z3P2fs+uebqsXgVbtKXmvdfHQuAAOhKkAAAAAAAAAGh1l0x6CGSD/vJLZ+CPPv5fsbXG4qNKnKpLdFX7+S729hzfFYiVeq5y9aTv3Lgl0SKnSuOdCmoQ70vsuPsvwT8BhlVnrS2L7v43s8UaeZ7d3FmWkfIRsrI9HKxjZF43cAA9GAAAAAAAAAAAAAAAAAAAAAAYdelbat3wMw8yV9jMSSaMp2LLqrpj0i9DN9uK7Lf3orh3r4dxZTlkJypTUou0otOLOi6Kxyr0o1Fx2SXsyW9HTaJxzrQ7Kfej918rf8lLpDDaku0jsfr+dvUzgAXJXAAAAAjqTUU5PYkrt8ktoBU9dMfdxoxexdqfe/VXlt8UaDCw2X5/A84uu61WU3vnJvuXBeC+BOkcNiq//kV5VN27lu+fM6ejS7Kkodee89AA1HsAAAAAAAAAAAAAAAAAAAAAAAAAAAixELq/FG01P0h6Or6Jvs1N3Sa3ea2eRgGG24TvHY004vk1tR7o1nQqxqrd6b10PNSmqsHB7zqgMbBYhVacai+9FPufFeZkndJpq6OYaadmAAZMA0+tGJ9Hhp23ytBeO/8A2pm4KprzW2Uoc3KT8LJfFkPSFXssNOS4W65e5JwkNetFeN+mZV8LHbfkZZBhVs8Sc4uCsjontAAPRgAAAAAAAAAAAAAAAAAAAAAAAAAAAGLi47n4GUR4hdlmJbDK2lq1LxGag4P7k3bult+OYsRSdR6tqs4e1Tv4pr6sux1+i6mvhYX3ZdHZfaxz+Ohq15eOfX83AALAiApGvEr14rlSXm5S/Yu5QtcX/iX0hFe6/wAyp007YV+LXz7Fho1XreTMCguyiQjpequ5Ehy6LsAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAeKi2PuZ7PjDBPqpO2Lp9c6f6JfNI6Ec21edsVS/OvemjpJ0egpXw8l/t7IqNKL+rF+HuwAC7KwFB1xX+Jl1hD4F+KPrtC2Ii+dOPmpSX0KnTSvhX4NfHuWGjf8A7eTNXS9VdyJDzh1eKJMpyyeRdbzyD7lPuUzcXPIE2km20kk223ZJLe2yuVdd8FGTXpJSt96NKbj4O20206NSr3It8k36GudWEO80uZYwVmevWCW6VSXRUZr+axptJfaJdWw1Gz9uq1s7oRe3zJENH4mbsoNc8vX+TVLGUYq+svLP0LrpHSFPDwdStNQiuL3t8kltb6I0+A1zwlaoqalKDbtFzhljJvcr8PGxy/SGPq4ieetOVSXBvclyilsS7iKhh5VZKnTTlOTyxit7b/5v4FtT0JTUP6ks+KtZddvN2K+ekZ630LL7v2zO7g+UqbUYpu7UUm+bS2s9ZTnLlzc+A+5RlMXFzQ6X1rw2Gn6OcpSmrZowjmy973J9N5n6J0vRxUc1Calb1o7pR74vajkWnsLOliqsaqal6Scru/ajKTakuaa/5sMXC4mdKanSlKE1ulF2fd1XQ6P/AKalKlFwk9Zq99z8uHIqP+xmpvWWWy2xndQc70X9oU4pLE01U/HTajLxi9jfc0b6lr5g2trqw6OlJ/y3Kqpo7E03bUb5Z+mfVJ+BOhjKMl3rc8izArS15wV7Z59/oall7rlhw1aNSCnTkpwkrxlF3TRHqUKtKznFq/FNG2FaE+60+TRID1lPmU1XNlz4fGesp5qKyfczAuNX1fFUvzr3bTpJzvVaF8XT6Zn5Ql87HRDpNAr/ANeT/wBvaJUaUf8AUjy92AAXZWAqWvVH/wDKf54v3NfMtppdbMPnwsrb4OM/k/c35ELSNPtMLOK4X6ZknBz1a8X5dcinYHbHuZk2MPRsu01zXwNnlOKTyL6btIgyjKTZRlMnnWK1r7RnLAVVTTfqOaW901JOXhbf0TOPH6Hymorar4ObcpYajdu7ago3fPZYttH6TjhoOEo3zvlyS9iDicM6slJPccPEIuTyxTlJ7opNt9yR22OqeCX+Wovvjf4mywuBp0lalThTXKEIx+CJs9O0/wC2DfNpelyOsBLfJff8HJ9Daj4qu06kf4en7U122ukN/nY6HoLVyhg42pRvNrtVZbZy8eC6KyN5lPuUqcVpCviFaTsuC2ee9+ZNo4enSzW3j+7CDKMpNlGUhEjWIcoyk2UZQNY1el9C0cXDJXhm9mS2Sg+cZcPgc701qBiKN5Yf/EQ5bI1Euq3S8PI6zlGUmYXH1sP3Hlwez8eT5mitQp1e8s+J+eq9KVOWWpGUJezKLi/Jnk/QOIwsKitUhGa5SjGS95rJ6qYJ/wCVorugo/y2LeGnoPv035O/rYhPAPdL9+5xE6f9l9Kawk3K+R1m6V+KyxUmuma/imb+OqeCW7DUfGOb4m3jTSSSSSWxJKyS6ETH6VhiKXZwi1mnd23cr/vM3YfCulPWbIsoyk2UZSnJ+sQ5SHF7IPyMzKYGk5bo+P8Az3mGzMHdm01Jo3rSl7NN+cmvkmXcrWpWHy0ZTf352XdFfVvyLKdjoqnqYWHjd9Xl9rFLj561d+GXTb9wACxIYIq1JTjKMt0otPuasyUAHLpwdGq4y3wk79bOxu0rnrXPAZZqslsn2ZfnS2ea/lMPRFbNHK98f5Tg8Xh3h60qfDZy3fvE6NVO1pqovP3+5k5RlJrCxGua7kOUZSawsLi5DlGUmsLC4uQ5RlJrFc1m1vw+BvGT9LWtsowauuWd7oL39GbKVOdWWpBXfBHmVRRV2ze5T7lONaW18xldtRmsPD2aWx26zfav1Vit1q86jvUnOo+c5yk/OTLmloKrJXnNR5fV7pdGyJLHRXdV/t8n6JUT5lPztRqSg7wlKD5xk4vzRvtFa543D2tWdWK+5WvUX6n2l5mamgaqV4TT5pr5EcdF7Vb7/B2vKMpWNWNeqGLap1F/D1nsUZSvCb/BPZt6Oz5XLbYpq1GdGWpUVn+9V4olwqRmrxZDlGUmsLGq56uQ5RlJrCwuLkOUZSawsLi5DlNJip56jtt22j14I22kq2SHV7F82fNUsD6Svna7NOz75fdXz8DdQouvUjTjvf8APRZm2M1ThKpLcXLRuF9FShT9mKT6ve353MsA76MVFWWxHONtu7AAMmAAADE0lg1XpSpy4rY+UltT8znSzYeq1JWlFtSXPn4fsdQK1rXoj0kfS0124ral96K496+HgU2l8E60O0h3o/dfK2rzLDAYhQl2c9j9fzsMalJSipR2prYe8podE4/0byy9R/7Xz7ixJHIE2pBwdiLKMpNlGUXPGsQ5RlJspq9Z9IvCYOtXSvKFNuKe70j7Mb9LtHqEXOSjHa8kYc7K5UftB10/hr4bCtena/vKmx+hTWxL8bXktvI5LKTbbbbbbbbbbbe9tvezO0fo/EY2s40ozr1ZPNN7N8ntnOT2RV77WdJ0D9llOKUsbUdWXGlTbjBdHL1peGU6+M8LoynqSf1PbbOT8ty4XsreLZWvXryucnW12W18FxZnU9C4qfqYbEy6rDYhrzUbH6C0doihh1ahRp0l+CEU33ve/EzcpAqf8gf+On1ftb3ZtWFW9n5yqaDxUfWwuKXV4XEW88pgTi4u0k4vk00/Jn6cymNjtH0q8ctanSqx5ThGS95in/yGS79NeTa9U/VCWFW5n5raOk/Z7rs80cJi5XvaNGtJ7b8Kc2999yl4PgbjTv2X4ereWFlLDz9ltzpN9z7UfB26HMdPaAxGBnkxNNxu+xNO8J/ll8nZ9Cx7bCaSp9lez3XX1LxW1PxSb8bGq06L1v4P0JlGU0H2e6Wli8BCdR3qQcqU5e24WtJ9XFxv1uWXKcjVpypTlTltTa6FjGeskyHKMpNlGU13PWsQ5T5KyV3sS2tk+Ur+mMfneSD7Ke1+0/oD3Ti5uyMbF1nWqbE3dqMI8d+zxZftCYFUKKhx3zfOT3+W7wNJqnoe1q9RcP7pPl7X0/6LYdZobBOnHtprN7OX59CJpDEKT7KGxbef49QAC8K0AAAAAAAAApus2grN1qK2b5wXD8S6c+Xw1ei9Kej7M9sOD4x/Y6MVPT2rV71KC275U+fWP08uRzmk9FN3q0VzXuvddOBbYXGRlHsq3k/n56k0ZJq6d09zXE9FWweOnRduF+1B8+Pczf4PHQqrsvbxi96+pzLVjfUoyhyMoixOHhVhKnUjGcJJqUZJNST4NMlATtmaTF0do2jh4ZKFKnSje+WnBRTfN23sygA227sbAADAAAABBjMJTrQdOrCFSD3wnFSi+9MnBnZmDGwGBpYeCp0KdOlBNtQhFJXe1vZxMkANtu7CQPjdt5Bi8ZCkryfclvfgaDH6SlV2erHhFce/mLG2nRlPZsMnSulc14U32eMva6LoZWregXVaq1VamvVT/wDI/wCn4k+gdWm7VK6tHfGnxf5uS6FvhGysti4LkdJo3RLyq1lluXu/jqasTjI049nR838fv49AA6UqAAAAAAAAAAAAAAADU6W0JSxG19mfCaW3xX3kU7SOh62Hd2rxW6pG9vHjHxOjgrsXoyjiPq2S4r3W/wBfEmYfG1KOW1cPj9a8DnGE0zOOyfbXk/PibbD6UpT+9lfKWz37jbY/VuhV2pejlzhZJ98d3lYr+M1VrQ2wtVXR5X5P6nO19D4mm8lrLivjb0TJ8a+Gq79V9Px6G3QKrKNag7NVKX6op/JklPTNVcVLvivlYq5QcXaWT8cja8M7Xi7lmBoo6elxhF9za+p7Wn1/pv8AV+xjVZ4dCpwN0DSvT6/03+r9jxLTz4QS75N/JDVYVCpwN6CtVNM1Xuyx7o/W5DerWdl6Sp07UvcjMYOTstp7WGltk7FgxGkqcN8k3yjtZqcVpuUtkFkXPe/oifB6r15+slSXV3fkvnYsOj9WqNPbK9WX4vV8I/W5Z4fRGIq5taq4yy+2305muVbDUt+s+v49Sp4DRVbEyuk2r7Zyvl8+PgW/Q+gKdC0n26ntNer+VcO/ebiKsrLYuB6Oiwei6OH+p/VLi93Jbvu/Er8RjqlXJZLgvn9XgAAWRDAAAAAAAAAAAAAAAAAAAAAAAAPLXBmFX0VRn61OHeoqL80Z4PMoRllJX5nqMpR7rsaOeq+Ge6Mo905fO5G9UMPzqfqh/SWAEZ4DCv8Axx6I3LF11/e/3mV/+yND2qv6of0nuGquHW9Tl3zfysb0BYDDL/HHog8XXf8Ae/T0NdQ0NQh6tKHis381zOhBJWSSXJKx7BIhCMFaKS5K3oaZTlLvNvmAAezyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"
    },
    {
      name: "Emma Watson",
      text: "It is Leviosa not Leviosar ^_^",
      url:
        "https://i.pinimg.com/originals/88/aa/b9/88aab93b1948c13d6acb878ced5e182e.jpg"
    },
    {
      name: "Demi Lovato",
      text: "Let it Go!!!!!!!!!",
      url:
        "https://media.glamour.com/photos/603698584b44a9f9f3f58b7b/6:7/w_2560%2Cc_limit/GL-DL-01.jpg"
    },
    {
      name: "Mahatma Gandhi",
      text: "Lets protest by Walking barefoot!!!",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg"
    },
    {
      name: "Elon Musk",
      text: "Earth to Mars",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
    },
    {
      name: "Indira Gandhi",
      text: "Nobody likes me, but everyone cannot help but like me",
      url:
        "https://feedsnitt.com/wp-content/uploads/2017/12/Indira-Gandhi-ili-50-img-3.jpg"
    },
    {
      name: "Kim SeokJin",
      text: "Kitty1's bias",
      url:
        "https://i2.wp.com/allkpopdrama.com/wp-content/uploads/2019/07/Jin-1.jpg?ssl=1"
    },
    {
      name: "Min Yoongi",
      text: "Kitty2's Bias",
      url: "https://wallpaperaccess.com/full/4023553.jpg"
    },
    {
      name: "Jeong Hoseok",
      text: "Maknae Bias wrecker",
      url:
        "https://images.saymedia-content.com/.image/t_share/MTc0OTkyMDg4ODc3MDQ5ODI0/10-facts-and-profile-about-bts-member-j-hope-jung-hoseok.png"
    },
    {
      name: "Kim Namjoon",
      text: "President of ARMY",
      url: "https://miro.medium.com/max/1200/1*ba2Kl9RqrvVf-z-WbP2S-A.jpeg"
    },
    {
      name: "Park Jimin",
      text: "Kitty2 bias wrecker",
      url: "https://i1.sndcdn.com/artworks-M8sDqbarBMuou6Yq-TqizRQ-t500x500.jpg"
    },
    {
      name: "Kim Taehyung",
      text: "Oldest kid's bias",
      url:
        "https://influencermarketinghub.com/wiki/wp-content/uploads/2020/10/a83286b538ec140c6127b0832890931a.jpg"
    },
    {
      name: "Jeon Jungkook",
      text: "Mom's bias",
      url:
        "https://i.pinimg.com/originals/54/4c/30/544c30e8e64ed4683f3fb2730d93474a.jpg"
    },
    {
      name: "Jennie Ruby Jane",
      text: "Chanel",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Jennie_at_the_Sprite_Waterbomb_Festival_2018_%281%29.jpg/170px-Jennie_at_the_Sprite_Waterbomb_Festival_2018_%281%29.jpg"
    },
    {
      name: "Lalisa Manoban",
      text: "Blackpink maknae",
      url:
        "https://i.pinimg.com/736x/ac/c9/b9/acc9b9214f58c2d31e51067218b0298d.jpg"
    },
    {
      name: "Xiao Zhan",
      text: "Angel on Earth",
      url:
        "https://filmdaily.co/wp-content/uploads/2020/02/xiao-zhan-lede-1-1300x1625.jpg"
    },
    {
      name: "Wang Yibo",
      text: "UNIQ maknae",
      url: "https://wallpapercave.com/wp/wp7949485.jpg"
    },
    {
      name: "Elon Musk",
      text: "Earth to Mars",
      url:
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
    }
  ]);
  useEffect(() => {
    database
      .collection("people")
      .onSnapshot((snapshot) =>
        setPeople(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div class="wrapper">
              <div
                className="card"
                style={{ backgroundImage: `url(${person.url})` }}
              >
                <div class="descriptions">
                  <h3>{person.name}</h3>
                  <p>{person.text}</p>
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
