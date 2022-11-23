class Api::TasksController < ApplicationController
    before_action :set_task, only: [:show, :destroy, :update]
    before_action :authenticate_user!

    def index
        render json: current_user.tasks
    end

    def show
        render json: @task
    end

    def create
        @task = Task.new(task_params)
        @task.user = current_user
        if(@task.save)
            render json: @task
        else
            render json: {errors: @task.errors }, status: :unprocessable_entity
        end
    end

    def update
        if(@task.update(task_params))
            render json: @task
        else
            render json: {errors: @task.errors }, status: :unprocessable_entity
        end
    end

    def destroy
        render json: @task.destroy
    end

    private

    def task_params
        params.require(:task).permit(:title, :completed)
    end

    def set_task
        @task = Task.find(params[:id])
    end
end