/**
 * Created by zhousg on 2016/3/20.
 */
$(function(){
    /*�ֲ�ͼ*/
    banner();
});
/*�ֲ�ͼ*/
function banner(){
    /*
    * 1.д��һ����̬���ֲ�ͼ
    * 2.��index��html����������  ��index��htmlΪ���·��
    * 3.���ݻ���
    * 4.ģ������  �﷨ ����д����
    * 5.
    * */
    /**
     * 1.ͨ��ajax��ȡ����  ͼƬ
     * 2.�ж���Ļ�ĳߴ�  $(window).width();
     * 3.������Ļ�ĳߴ� jsonת����Ⱦhtml�ַ���  (1.js��ƴ���ַ��� 2.ģ������)
     * 4.��Ⱦ��ҳ�浱�� html('���ǽ�����html');
     * 5.��Ӧ��Ļ�ĳߴ�  ����Ⱦ��ǰ��Ļ�ߴ��µ�ͼƬ  resize�¼�
     * */
    /*
    * Ŀ�ģ��Ż�Ŀ��
    *1.ͼƬ���ع���
    *2.���ƶ�����Ҫ������
    *
    *��֮��ͼƬ��Ӧ
    * */

    /* 1.ͨ��ajax��ȡ����  ͼƬ */

    /*���ݻ���*/
    var myData = '';

    var getData = function(callback){
        /*��������Ѿ����� ���ǾͲ���������*/
        if(myData){
            /*�����Ѿ����ڵ�����*/
            callback && callback(myData);
            /*������ִ����*/
            return false;
        }
        $.ajax({
            /*404  δ�ҵ���Դ
            * ��ǰ��Ŀ¼����index��html��  ���json��·��  js/index.json
            * */
            /*����һ���ӿ�*/
            url:'js/index.json',
            type:'get',
            data:{},
            dataType:'json',
            success:function(data){
                /*�������� data  ָ�����
                * function a(b){
                *   b
                * }
                *
                * */
                myData = data;
                callback &&callback(myData);
            }
        })
    }


    /*3.������Ļ�ĳߴ� jsonת����Ⱦhtml�ַ���  (1.js��ƴ���ַ��� 2.ģ������) artTemplate*/

    /*��ȡ����*/
    /*��Ⱦ*/
    var renderHtml = function(){
        /* 2.�ж���Ļ�ĳߴ� */
        /*��ǰ����Ļ�ߴ�*/
        var width = $(window).width();
        var isMobile = false;
        /*��768pxһ�¶���Ϊ���ƶ���*/
        if(width < 768){
            isMobile = true;
        }
        getData(function(data){
            /*��Ⱦhtml*/
            /*�õ�ģ��*/
            var templatePoint = _.template($('#template_point').html());
            var templateImage = _.template($('#template_image').html());
            /*�����ݴ���ȥ������html*/
            /*
            * key-value
            * */
            var pointHtml = templatePoint({model:data});
            /*
            * {
            *   model:{
            *       list:[]
            *       isMobile:isMobile
            *   }
            * }
            *
            * */
            var imageHtml = templateImage({model:{list:data,isMobile:isMobile}});

            /*4.��Ⱦ��ҳ�浱�� html('���ǽ�����html');*/
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    };

    /*5.��Ӧ��Ļ�ĳߴ�  ����Ⱦ��ǰ��Ļ�ߴ��µ�ͼƬ  resize�¼�*/
    /*
    * renderHtml��û�е���
    * trigger ��jquery�������������������¼�
    * .trigger('resize')  ����������resize�¼�
    * */
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');


    /*���ƶ�����Ҫ����*/
    var startX = 0
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.wjs_banner').on('touchstart',function(e){
        /*  ��jquery���� ��touch�¼���ʱ�� ���ص�  originalEvent  ��������ԭ����touchevent*/
        startX = e.originalEvent.touches[0].clientX;
    });
    $('.wjs_banner').on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    });
    $('.wjs_banner').on('touchend',function(e){
        /*
        * ������50��ʱ�������һ������
        * */
        if(isMove && Math.abs(distanceX)>50){
            if(distanceX >0 ){
                /*���һ���*/
                $('.carousel').carousel('prev');
            }else{
                /*���󻬶�*/
                $('.carousel').carousel('next');
            }
        }
         startX = 0
         moveX = 0;
         distanceX = 0;
         isMove = false;
    });
}